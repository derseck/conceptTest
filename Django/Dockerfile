From python:3.11.0-buster

ENV PYTHONUNBUFFERED=1

RUN apt-get update

RUN mkdir /src
WORKDIR /src

# Python dependencies
COPY requirements.txt /src/
RUN python -m pip install -r /src/requirements.txt

COPY . /src

CMD ["python","manage.py","runserver","0.0.0.0:8000"]