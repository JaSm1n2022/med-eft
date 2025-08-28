/* eslint-disable no-underscore-dangle */

class LatLngUtil {


  /**
 * @param {String | Date} date -
 * @param {Boolean} withDay -
 * @returns {String} -  Aug 6, 2007
 */

static rad2degr(rad) { return rad * 180 / Math.PI; }
static degr2rad(degr) { return degr * Math.PI / 180; }

  static getLatLngCenter(latLngInDegr) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;
    let lat = 0;
   let  lng = 0;
    for (var i=0; i<latLngInDegr.length; i++) {
         lat = this.degr2rad(latLngInDegr[i][LATIDX]);
         lng = this.degr2rad(latLngInDegr[i][LNGIDX]);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
     lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
     lat = Math.atan2(avgZ, hyp);

    return ([this.rad2degr(lat), this.rad2degr(lng)]);
}
}

export default LatLngUtil;
