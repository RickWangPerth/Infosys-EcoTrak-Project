import os
import sys
from dotenv import load_dotenv

# basedir = os.path.abspath(os.path.dirname(__file__))
# load_dotenv(os.path.join(basedir,'.env'))

# WIN = sys.platform.startswith('win')
# if WIN: 
#     prefix = 'sqlite:///'
# else:  
#     prefix = 'sqlite:////'

class Config(object):
  SECRET_KEY = os.environ.get('SECRET_KEY') or 'sshh!'
#   SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or prefix +os.path.join(basedir,'app.db')
  # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/ecotrak'
  # SQLALCHEMY_TRACK_MODIFICATIONS = False
  
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:postgres@postgresdb:5432/ecotrak'
  SQLALCHEMY_TRACK_MODIFICATIONS = False

