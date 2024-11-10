FROM python:3.10-slim

RUN pip install --upgrade pip && pip install pipenv

WORKDIR /mysterious-savannah-38599

COPY Pipfile* /mysterious-savannah-38599

RUN pipenv install --deploy --ignore-pipfile

COPY . /mysterious-savannah-38599

RUN useradd -m myuser && chown -R myuser /mysterious-savannah-38599
USER myuser

CMD ["pipenv", "run", "python", "app.py"]