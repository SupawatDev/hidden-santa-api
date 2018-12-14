
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://therealsanta:santasantasanta2018@ds125352.mlab.com:25352/heroku_8hxp33rt';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'none';
}
