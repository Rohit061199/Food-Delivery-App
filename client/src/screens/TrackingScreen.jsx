import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByIdAction } from '../actions/orderActions';
import L from 'leaflet';

const TrackingScreen = () => {
    const { orderId } = useParams();
    const dispatch=useDispatch();
    const [deliveryLocation, setDeliveryLocation] = useState({lat: 0, lng:0});
    const [deliveryAddressCoordinates, setDeliveryAddressCoordinates]=useState({lat:0, lng:0});
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [route, setRoute]=useState();
    const [eta, setEta] = useState(null);
    const {order, loading, error}=useSelector(state=> state.getOrderByIdReducer);

    const pizzaShopIcon=L.icon({
        iconUrl: process.env.REACT_APP_PIZZA_SHOP_ICON_URL,
        iconSize: [40,40],
        iconAnchor: [20,40],
        popupAnchor:[0,-40]
    });

    const homeShopIcon=L.icon({
        iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdHOYU1kDCzgS_A__r_xt5ZkesnLqxOwMq0Q&s",
        iconSize: [40,40],
        iconAnchor: [10,20],
        popupAnchor:[0,-40]
    });



    useEffect(() => {
        dispatch(getOrderByIdAction(orderId));

        //console.log(order);
        /*const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`/api/orders/${orderId}`);
                const data = await res.json();
                setDeliveryAddress({
                    lat: data.shippingAddress.latitude,
                    lng: data.shippingAddress.longitude
                });
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        fetchOrderDetails();*/
    }, [dispatch, orderId]);

    const getCoordinates = async (address) => {
        const apiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY; // Your OpenCage API Key

       // console.log(apiKey);
        
        const encodedAddress=encodeURIComponent(address);
        console.log(encodedAddress)
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`
        );
        console.log(response);
        const location = response.data.results[0]?.geometry;
        if (location) {
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Address not found');
        }
    };
    

    useEffect(() => {
        if (order) {
            console.log('Order from Redux:', order); // Log order after it's updated
            setDeliveryAddress({
                street: order.shippingAddress.street,
                city: order.shippingAddress.city,
                country:order.shippingAddress.country,
                pincode: order.shippingAddress.pincode
            }); 
        }
    },[order]);

    useEffect(()=>{

        if(deliveryAddress){
            console.log("Updated Delivery Address:", deliveryAddress);

            const fullAddress = `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.country}, ${deliveryAddress.pincode}`;
            
            getCoordinates(fullAddress)
                .then(coords => {
                    console.log("Coordinates:", coords);
                    setDeliveryAddressCoordinates({
                        lat: coords.lat,
                        lng: coords.lng
                    })
                })
                .catch(error => {
                    console.error("Error fetching the coordinates", error);
                });
        }
    }, [deliveryAddress])

    // Fetch route directions using OpenRouteService
    useEffect(() => {
        if (deliveryLocation && deliveryAddressCoordinates.lat!==0 && deliveryAddressCoordinates.lng!==0) {
            const getRoute = async () => {
                try {
                    const apiKey = process.env.REACT_APP_OPEN_SRT_API_KEY; // Your OpenRouteService API Key
                    //console.log(apiKey);
                    const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${deliveryLocation.lng},${deliveryLocation.lat}&end=${deliveryAddressCoordinates.lng},${deliveryAddressCoordinates.lat}`;

                    const response = await axios.get(routeUrl);
                    console.log(response)
                    const routeData = response.data.features[0].geometry.coordinates;

                    // Convert the route coordinates to Leaflet-friendly format (lat, lng)
                    const routeCoordinates = routeData.map(coord => ({
                        lat: coord[1],  // Latitude
                        lng: coord[0]   // Longitude
                    }));

                    setRoute(routeCoordinates); // Set the route data
                } catch (error) {
                    console.error("Error fetching the route:", error);
                }
            };

            getRoute();
        }
    }, [deliveryLocation, deliveryAddressCoordinates]);

    useEffect(() => {
        // Simulating API Call to fetch order details (Replace with actual API)
        if (!deliveryAddressCoordinates || !deliveryAddressCoordinates.lat || !deliveryAddressCoordinates.lng) return;
        console.log(deliveryAddress);

        // WebSocket connection for real-time delivery tracking (Replace with actual WebSocket implementation)
        const ws = new WebSocket('ws://localhost:8080/ws'); 

        ws.onmessage = (event) => {
            const location = JSON.parse(event.data);
            console.log(location);
            setDeliveryLocation({
                lat: location.lat,
                lng: location.lng
            });

            const apiKey=process.env.REACT_APP_OPEN_SRT_API_KEY;

            // Fetch ETA using OpenRouteService (Replace API key with yours)
            fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${-97.139271},${33.214013}&end=${deliveryAddressCoordinates?.lng},${deliveryAddressCoordinates?.lat}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.features[0].properties.summary.duration)
                    setEta(data.features[0].properties.summary.duration)});
        };

        return () => ws.close();
    }, [orderId, deliveryAddressCoordinates]);

    const SetMapView = ({ bounds }) => {
        const map = useMap();
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
        return null;
    };

    return (
        <div style={{ display: "flex", height: "90vh", width: "100%" }}>
            {/* Order Details Section */}
            <div style={{ flex: 1, padding: "20px", overflowY: "auto", backgroundColor: "#f8f9fa" }}>
                <h2>Order Details</h2>
                {order ? (
                    <div>
                        <p className='text-left'><strong>Order ID:</strong> {orderId}</p>
                        <p className='text-left'><strong>Customer:</strong> {order.name.toUpperCase()}</p>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                {order.orderItems.map((item, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <p style={{ marginRight: "20px" }}><strong>Pizza Name:</strong>  {item.name}</p>
                        <p><strong>Pizza Size: </strong> {item.varient}</p>
                    </div>
                ))}
            </div>
                        <p className='text-left'><strong>Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
                        {eta && <p className='text-left'><strong>ETA:</strong> {Math.round(eta)} min</p>}

                        <video 
  src="../../public/istockphoto-1279611228-640_adpp_is.mp4" 
  autoPlay 
  loop 
  muted 
  style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
/>
                    </div>
                    
                ) : (
                    <p>Loading order details...</p>
                )}
            </div>
    
            {/* Map Section */}
            <div style={{ flex: 1 }}>
                {deliveryLocation && deliveryAddressCoordinates ? (
                    <MapContainer center={deliveryLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={deliveryLocation} icon={pizzaShopIcon}>
                            <Popup>Delivery Person's Location</Popup>
                        </Marker>
                        <Marker position={deliveryAddressCoordinates} icon={homeShopIcon}>
                            <Popup>Delivery Address</Popup>
                        </Marker>
    
                        {/* Display the route as a polyline */}
                        {route && <Polyline positions={route} color="blue" />}
                        
                        {/* Fit the map view to markers and polyline */}
                        <SetMapView 
                            bounds={[
                                [deliveryLocation.lat, deliveryLocation.lng],
                                [deliveryAddressCoordinates.lat, deliveryAddressCoordinates.lng]
                            ]}
                        />
                    </MapContainer>
                ) : (
                    <h2>Loading Map...</h2>
                )}
            </div>
        </div>
    );
};

export default TrackingScreen;
