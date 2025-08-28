import React, { PureComponent } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import EndLocation from '../../../assets/images/markers/end.png';
import StartLocation from '../../../assets/images/markers/start.png';
import Caution from '../../../assets/images/markers/caution.png';
import Red from '../../../assets/images/markers/red.png';

import moment from 'moment';
type State = {

}
type Props = {
  pings: Object,
  centerLat: Object,
  centerLng: Object,
  shipment: Object,
  mapStyles: Object
}
const styleInfo = {
  overlay: { zIndex: 999 }
};
export class MapContainer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      categoryMarker: '',
      shipperName: '',
      shipperAddress: '',
      cnseName: '',
      cnseAddress: '',
      pingDt: '',
      location: '',
      temperature: '',
      light: '',
      humidity: '',
      bearing: '',
      speed: '',
      pingCnt: '',
      alerts: ''

    };


  }
  cToF = (c1, c2) => {
    let celsius = c1;
    if (!celsius) {
      celsius = c2;
    }
    try {
      if (celsius) {
        const f = celsius * 9 / 5 + 32;
        return f;
      } else {
        return '';
      }
    } catch (ex) {
      return '';
    }
  }
  onMarkerClick = (props, marker, e) => {
    const markerCategory = marker ? marker.category : '';
  
    if (markerCategory === 'shipper') {
      const shipment = marker ? marker.shipment : undefined

      this.setState({
        activeMarker: marker,
        showingInfoWindow: true,
        categoryMarker: markerCategory,
        shipperName: shipment.data.name,
        shipperAddress: shipment.data.address
      });
    } else if (markerCategory === 'consignee') {
      const shipment = marker ? marker.shipment : undefined

      this.setState({
        activeMarker: marker,
        showingInfoWindow: true,
        categoryMarker: markerCategory,
        cnseName: shipment.name,
        cnseAddress: shipment.address
      });
    } else if (markerCategory === 'ping') {
      const date1 = moment(new Date(marker.ping.dt1)).format('MM-DD-YYYY');
      const time1 = moment(new Date(marker.ping.dt1)).format('HH:mm');
      const date2 = moment(new Date(marker.ping.dt2)).format('MM-DD-YYYY');
      const time2 = moment(new Date(marker.ping.dt2)).format('HH:mm');
      let markerPingDt = date1 + ' ' + time1;
      if (date1 !== date2 || time1 !== time2) {
        markerPingDt += ' to ';
        if (date1 !== date2) {
          markerPingDt += date2;
        }
        if (time1 !== time2) {
          markerPingDt += ' ' + time2;
        }
      }
      this.humidity = (typeof marker.ping.h2o === 'undefined') ? '' : marker.ping.h2o.toString();
      this.bearing = (typeof marker.ping.bearing === 'undefined') ? '' : marker.ping.bearing.toString();
      this.speed = (typeof marker.ping.speed === 'undefined') ? '' : marker.ping.speed.toString();
      this.alerts = (marker.ping.alerts && marker.ping.alerts > 0) ? marker.ping.alerts : '';
      this.pingCnt = (marker.ping.pingCnt > 0) ? marker.ping.pingCnt :
        (marker.ping.pings && marker.ping.pings.length > 0 ? marker.ping.pings.length : 1);
  
      this.setState({
        activeMarker: marker,
        showingInfoWindow: true,
        categoryMarker: markerCategory,
        pingDt: markerPingDt,
      location: marker.ping.lat + ',' + marker.ping.lon,
      temperature: this.cToF(marker.ping.ambient, marker.ping.temp).toString(),
      light: (typeof marker.ping.light === 'undefined') ? '' : marker.ping.light.toString(),
      humidity: (typeof marker.ping.h2o === 'undefined') ? '' : marker.ping.h2o.toString(),
      bearing: (typeof marker.ping.bearing === 'undefined') ? '' : marker.ping.bearing.toString(),
      speed: (typeof marker.ping.speed === 'undefined') ? '' : marker.ping.speed.toString(),
      pingCnt: (marker.ping.pingCnt > 0) ? marker.ping.pingCnt :
      (marker.ping.pings && marker.ping.pings.length > 0 ? marker.ping.pings.length : 1),
      alerts: (marker.ping.alerts && marker.ping.alerts > 0) ? marker.ping.alerts : ''
       
      });
    }
  }
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const { google } = this.props;
    const { pings, centerLat, centerLng, shipment, mapStyles } = this.props;
    let isWithPings = false;
    const center = { lat: 1.0 * centerLat, lng: 1.0 * centerLng };
    const cnsePos = shipment && shipment.cnseLat && shipment.cnseLng ? { lat: 1.0 * shipment.cnseLat, lng: 1.0 * shipment.cnseLng } : {};
    const shipperPos = shipment && shipment.shipperLat && shipment.shipperLng ? { lat: 1.0 * shipment.shipperLat, lng: 1.0 * shipment.shipperLng } : {};
    let triangleCoords = [];
    if (shipment && shipment.shipperLat && shipment.shipperLng && (1.0 * shipment.shipperLat !== NaN) && (1.0 * shipment.shipperLng !== NaN)) {
      triangleCoords.push({ lat: 1.0 * shipment.shipperLat, lng: 1.0 * shipment.shipperLng });
    }
    if (pings && pings.length) {
      for (let i = 0; i < Object.keys(pings).length; i++) {
        if ((1.0 * pings[i].lat !== NaN) && (1.0 * pings[i].lon !== NaN)) {
          if (pings[i].isForCenter) {
          } else {
            isWithPings = true;
          triangleCoords.push({ lat: 1.0 * pings[i].lat, lng: 1.0 * pings[i].lon });
          }
        }
      }
    }
    if (shipment && shipment.cnseLat && shipment.cnseLng && (1.0 * shipment.cnseLat !== NaN) && (1.0 * shipment.cnseLng !== NaN)) {
    
      triangleCoords.push({ lat: 1.0 * shipment.cnseLat, lng: 1.0 * shipment.cnseLng });
    }
    return (
      <Map
        google={this.props.google}
        zoom={4}
        style={mapStyles}
        center={center}
        className={'map'}
      >
        <Polyline
          path={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} />
        {shipment && shipment.shipperLat && shipment.shipperLng &&
          <Marker

            onClick={this.onMarkerClick}
            position={shipperPos}
            title={shipment.shipper.name}
            name={shipment.shipper.name}
            category={'shipper'}
            shipment={{ name: "test", address: shipment.shipperAddress }}
            icon={{
              url: StartLocation,
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32)
            }} />

        }



        {isWithPings && pings && pings.length  && pings.map(pingItem =>
          (
            <Marker
            onClick={this.onMarkerClick}
          
              key={pingItem._id}
              position={pingItem.pos}
              category={'ping'}
              ping={pingItem}
              name={'Your Position'} 
              icon={{
                url: pingItem.alerts && pingItem.alerts > 0 ? Caution : Red,
                anchor: new google.maps.Point(16, 16),
                scaledSize: new google.maps.Size(32, 32)
              }} />
           
          ))}
       
        {shipment && shipment.cnseLat && shipment.cnseLng &&
          <Marker
            onClick={this.onMarkerClick}

            position={cnsePos}
            title={shipment.consignee.name}
            name={shipment.consignee.name}
            category={'consignee'}
            shipment={{ name: shipment.consignee.name, address: shipment.cnseAddress }}

            icon={{
              url: EndLocation,
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32)
            }} />


        }

        <InfoWindow
          style={styleInfo}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
          {this.state.categoryMarker === 'shipper' &&
            <div>
              <h3>{this.state.shipperName}</h3>
              <br />
              <strong>{this.state.shipperAddress}</strong>
            </div>
          }
          {this.state.categoryMarker === 'consignee' &&
            <div>
              <h3>{this.state.cnseName}</h3>
              <br />
              <strong>{this.state.cnseAddress}</strong>
            </div>
          }
          {this.state.categoryMarker === 'ping' &&

            <div>
              <div>
                <strong>{this.state.pingDt}</strong>
                <br />
              </div>
              <div>
                <span>Loc</span>: {this.state.location}
              </div>
              {this.state.temperature &&
              <div>
                <span>Temperature</span>: {this.state.temperature}
              </div>
              }
              {this.state.light &&
              <div>
                <span>
                  <span>Light</span>: {this.state.light}</span>
              </div>
              }
              {this.state.humidity &&
              <div>
                <span>
                  <span>Humidity</span>: {this.state.humidity}</span>
              </div>
              }
              {this.state.bearing &&
              <div>
                <span>
                  <span>Bearing</span>: {this.state.bearing}</span>
              </div>
              }
              {this.state.speed && 
              <div>
                <span>
                  <span>Speed</span>: {this.state.speed}</span>
              </div>
              }
              {this.state.pingCnt > 1 &&
              <div>{this.state.pingCnt}
                <span>
                  <span> pings</span>
                </span>
              </div>
              }
              {this.state.alerts &&
              <div>
                <strong>
                  <span>Alerts</span>: {this.state.alerts}</strong>
              </div>
              }
            </div>
          }
          </div>
        </InfoWindow>

      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9FAPZN1zFcTnxVs9M5r0DhzWTUE4MV7Q'
})(MapContainer);