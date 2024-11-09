FROM python:3.10-slim

RUN pip install --upgrade pip && pip install pipenv

WORKDIR /usr/local/app

COPY Pipfile* ./
RUN pipenv install --deploy --ignore-pipfile

COPY . .