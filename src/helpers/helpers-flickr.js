/*! flickr helpers*/

(function() {
  var clown;
  module.exports = {
    clown: clown = function(value) {
      var photos, photo, template, context, html;

      photos = this.photos.photo;
      photos.some(function(element, index, array){
        if (element.id == value) {
          photo = element;
          return element;
        }
        photo = undefined;
        return false;
      });

      if(photo === undefined) { return ""; }
      orientation = parseInt(photo.width_t) > parseInt(photo.height_t) ? "landscape" : "portrait";
      if(orientation == "portrait") {
        html = "<object data=\"data:image/svg+xml,<svg viewBox='0 0 " + photo.width_t + " " + photo.height_t + "' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg'><title>" + photo.title + "</title><style>svg{background-size:100% 100%;background-repeat:no-repeat;}@media screen and (max-width: 500px){svg{background-image:url(" + photo.url_c + ");} }@media screen and (min-width: 501px) and (max-width:640px){svg{ background-image:url(" + photo.url_l + ");}}@media screen and (min-width: 640px){svg{background-image:url(" + photo.url_k + ");} }</style></svg>\" type='image/svg+xml'><!--[if lte IE 8]><img src='" + photo.url_m + "' alt='" + photo.title + "'><![endif]--></object>";
      } else {
        html = "<object data=\"data:image/svg+xml,<svg viewBox='0 0 " + photo.width_t + " " + photo.height_t + "' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg'><title>" + photo.title + "</title><style>svg{background-size:100% 100%;background-repeat:no-repeat;}@media screen and (max-width: 500px){svg{background-image:url(" + photo.url_m + ");} }@media screen and (min-width: 501px) and (max-width:640px){svg{ background-image:url(" + photo.url_z + ");}}@media screen and (min-width: 640px){svg{background-image:url(" + photo.url_l + ");} }</style></svg>\" type='image/svg+xml'><!--[if lte IE 8]><img src='" + photo.url_m + "' alt='" + photo.title + "'><![endif]--></object>";
      }
      html = '<figure class="image image--' + orientation + '">' + html + '<figcaption class="image-title">' + photo.title + ' <a class="image-cite" href="http://www.flickr.com/photos/' + photo.pathalias + '/' + photo.id + '/">original</a></figcaption></figure>';


      return html;
    }
  };

  module.exports.register = function(Handlebars, options) {
    Handlebars.registerHelper("clown", clown);
    return this;
  };

}).call(this);
