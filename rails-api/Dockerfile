FROM ruby:3.0.2
RUN apt-get update -qq \
&& apt-get install -y curl build-essential libpq-dev \
 nodejs postgresql-client &&\
  curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
  apt-get update && apt-get install -y nodejs
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN gem install bundler:1.16.1

RUN mkdir /usr/src/rails-api
WORKDIR /usr/src/rails-api

RUN echo "gem: --no-rdoc --no-ri" > /etc/gemrc
ADD Gemfile /usr/src/rails-api/Gemfile
ADD Gemfile.lock /usr/src/rails-api/Gemfile.lock
RUN bundle install --jobs 20 --retry 5
ADD . /usr/src/rails-api
EXPOSE 3000

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
# CMD ["rails", "s", "-b", "0.0.0.0"]
