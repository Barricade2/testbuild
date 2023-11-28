import os
import django
#sys.path.append('/path/to/your/django/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from app.main import services
from app.main.models import Format

def start():
	#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
	ikey = input("Input key: ")
	if ikey == "0":
		Format.objects.auto_create_tree()
	elif ikey == "1":
		services.start_movie_dto_write_to_datebase()
	elif ikey == "2":
		services.deserialize_imdb_api_dto()
	elif ikey == "3":
		services.get__dict_movie_dto_and_imdb_api_dto()
	elif ikey == "4":
		services.get_tmdb_all_data_and_save_json_data_in_file()
	elif ikey == "5":
		services.___set__people__from_imdb_api_dto__for_movie_dto()
	elif ikey == "6":
		services.set_image_for_people_imdb_api_dto()

if __name__ == '__main__':
	start()
