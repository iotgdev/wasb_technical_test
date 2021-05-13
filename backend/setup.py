import os

from setuptools import setup, find_packages

VERSION = '0.0.0'

about = {
    'here': os.path.abspath(os.path.dirname(__file__))
}

try:
    with open(os.path.join(about['here'], 'README.md')) as f:
        about['readme'] = f.read()
except IOError:
    about['readme'] = 'README.md not found'
setup(
    # available in PKG-INFO
    name='tasti-rest-api',
    version=VERSION,
    description='api application for tasti',
    url='https://github.com/iotgdev/wasb_technical_test/',
    author='wasb',
    long_description=about['readme'],
    platforms=[
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'Operating System :: POSIX :: Linux',
        'Programming Language :: Python :: 3',
    ],

    # Package Properties
    packages=find_packages(include=['api', 'api.*',]),
    include_package_data=True,
    install_requires=[
        'djangorestframework',
        'django',
        'django-cors-headers',
    ]
)

