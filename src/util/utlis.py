import re
from contextlib import contextmanager


def safe_list_get(l, i, default = None):
    try:
        return l[i]
    except IndexError:
        return default


def safe_def(**statement): # safe_do(func=divide,args=[1,0],kwargs={})
    try:
        statement['func'](*statement['args'],**statement['kwargs'])
    except Exception as e:
        print(e, statement['func'], statement['args'], statement['kwargs'])

def safe_def_dec(func): # @mydec def f1()
  def dec():
    try:
      func()
    except Exception as e:
      print(e)
  return dec

@contextmanager
def safe_def_ignoring(*exceptions, action=print): # with ignoring(KeyError, action=log): something()
    try:
        yield
    except exceptions or Exception as e:
        callable(action) and action(e)

def has_cyrillic(text):
    return bool(re.search('[а-яА-Я]', text))

def has_latin(text):
    return bool(re.search('[a-zA-Z]', text))
