import pickle
import ssl
import threading
from enum import Enum

import pika

from config import settings

class RabbitMQConnectorType(Enum):
    consumer = 1
    producer = 2

class RabbitMQConnector(threading.Thread): #RabbitMQConnector
    """
    start RabbitMQConnector:
        def ready(self):
            consumer = RabbitMQConnector(connector_type=RabbitMQConnectorType.consumer).instance()
            producer = RabbitMQConnector(connector_type=RabbitMQConnectorType.producer, content_type='product_updated', body=1).instance()
    """

    @staticmethod
    def _get_connection():
        parameters = pika.URLParameters(settings.RABBIT_URL)
        credentials = pika.credentials.PlainCredentials(username=settings.RABBIT_USERNAME,
                                                        password=settings.RABBIT_PASSWORD)
        parameters = pika.ConnectionParameters(
            host=settings.RABBIT_HOST,
            port=settings.RABBIT_PORT,
            virtual_host=settings.RABBIT_USERNAME,
            credentials=credentials,
            ssl_options=pika.SSLOptions(ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)))
        return pika.BlockingConnection(parameters)

    def __init__(self, connector_type: RabbitMQConnectorType, content_type: str = None, body = None):
        super().__init__()
        self.connection = None
        self.channel = None
        self.active_movie_id = 0
        self.active_chat_id = 0
        self.connector_type = connector_type
        self.content_type = content_type
        self.body = body
        #threading.Thread(target=self.channel.basic_consume(QUEUE_NAME, on_message_callback=self.callback)) # for safe run
        #self.channel.start_consuming() # in run()

    def instance(self):
        self.daemon = True
        self.start()

    def callback(self, channel, method, properties, body):
        print('Received in main')
        content = pickle.loads(body)
        print(" [x] %r:%r" % (method.routing_key, content)) # for subscribe direct
        # routing_key == "admin"
        print(" [x] %r:%r" % (method.exchange, content)) # for subscribe fanout
        # method.exchange.contains("main-movie")
        print(" [x] %r:%r" % (properties.content_type, content)) # for run
        # properties.content_type == "product_updated"
        print(content)
        #movie_or_none = Movie.objects.filter(id=id).first()
        #print(movie_or_none)

    def set_active_movie(self, id):
        self.active_movie_id = id

    def set_active_chat(self, id):
        self.active_chat_id = id

    def subscribe(self):
        # listing bindings

        self.connection = self._get_connection()
        self.channel = self.connection.channel()

        #channel.queue_declare(queue='main', exclusive=True) # слушает только одну очередь с именем main
        q = self.channel.queue_declare(queue='', exclusive=True) # create queue, with random queue name,  свежая, пустая очередь, слушает обо всех сообщениях, exclusive очередь должна быть удалена как только потребитель отключится.
        self.callback_queue = q.method.queue
        self.channel.exchange_declare(exchange='main-movie-{0}'.format(self.active_movie_id), exchange_type='fanout', durable=False) # create обменник типа fanout, рассылает все сообщения всем получателям о которых он знает
        self.channel.exchange_declare(exchange='profile-chat-{0}'.format(self.active_chat_id), exchange_type='fanout', durable=False)
        self.channel.exchange_declare(exchange='direct_logs', exchange_type='direct')
        self.channel.queue_bind(exchange='main-movie-{0}'.format(self.active_movie_id), queue=self.callback_queue) # create привязки, привязывает очередь к обменнику, нужно сказать обменнику, чтобы он отправлял сообщения в нашу очередь, routing_key игнорируется при отправке fanout
        self.channel.queue_bind(exchange='profile-chat-{0}'.format(self.active_chat_id), queue=self.callback_queue)
        self.channel.queue_bind(exchange='direct_logs', queue=self.callback_queue, routing_key='rk!')
        print('Hello world!')
        self.channel.basic_qos(prefetch_count=1)
        self.consumer_tag = self.channel.basic_consume(
            queue=q.method.queue,
            on_message_callback=self.callback,
            auto_ack=True) # обрабатывает все сообщения, не только очереди из main

        self.channel.start_consuming()

    def unsubscribe(self):
        self.channel.close()
        self.connection.close()
        self.active_movie_id = 0
        self.active_chat_id = 0

    def run(self): # method Thread
        #self.subscribe()
        #self.publish("product_updated", 1)
        # producer = RabbitMQConnector(type = "producer", method = "product_updated", body = 1)
        # producer.daemon = True
        # producer.start()
        # consumer = RabbitMQConnector(type = "consumer")
        # producer.daemon = True
        # producer.start()
        if self.connector_type == RabbitMQConnectorType.consumer:
            self.subscribe()
            #self.connect() #MAIN FOR PROJECT
        elif self.connector_type == RabbitMQConnectorType.producer:
            self.publish(self.content_type, self.body)

    def connect(self):
        #connection = self._get_connection()
        #channel = connection.channel()

        self.channel.queue_declare(queue=settings.RABBIT_QUEUE)
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(queue=settings.RABBIT_QUEUE, on_message_callback=self.callback, auto_ack=True)
        #self.channel.start_consuming()
        #channel.close()

    def disconnect(self):
        pass

    def publish(self, method, body):
        print('Produced in main')
        # RabbitMQConnector.publish("product_updated", 1)
        self.connection = self._get_connection() # -> init
        self.channel = self.connection.channel() # -> init

        # Change title to RabbitMQConnector
        properties = pika.BasicProperties(method)
        # безымяный обменик "" с очередью 'admin'
        #self.channel.basic_publish(exchange='', routing_key=settings.RABBIT_QUEUE, body=pickle.dumps(body), properties=properties)
        # for  type='fanout' с обменком "..." routing_key игнорируется при отправке
        self.channel.exchange_declare(exchange='direct_logs', exchange_type='direct')        #  публикация сообщения в несуществующий обменник запрещена
        self.channel.basic_publish(exchange='direct_logs', routing_key="rk!", body=pickle.dumps(body), properties=properties)


# def ready(self) -> None:
#     consumer = AMQPConsuming()
#     consumer.daemon = True
#     consumer.start()

#decorators.py, сервер что общается самой собой через RabbitMQ, как Сelery
# def callback(function_to_decorate):
#     user = settings.BROKER_USER
#     broker_host = settings.BROKER_HOST
#     password = settings.BROKER_PASSWORD
#     credentials = pika.PlainCredentials(user, password)
#     parameters = pika.ConnectionParameters(host=broker_host, credentials=credentials)
#     def receiver(*args, **kw):
#         (backend_function, data) = function_to_decorate(*args, **kw)
#         pickled_obj = pickle.dumps(data)
#         queue_name = str(time.time()) # random queue name
#         print ("call_backend", backend_function.__name__)
#         connection = pika.BlockingConnection(parameters)
#         channel = connection.channel()
#         channel.queue_declare( queue = queue_name) # consumer
#         channel.basic_publish(exchange='', routing_key=queue_name, body=pickled_obj) # producer
#         channel.basic_consume( backend_function, queue=queue_name, no_ack = True) # consumer
#         channel.queue_delete(queue=queue_name)
#         connection.close()
#     return receiver

