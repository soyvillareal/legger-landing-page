
import { useState, useEffect } from 'react';

export default function GetIP() {
  // Prepare a constant `ip` with empty data by default
  const [ip, setIp] = useState()

  const getIp = async () => {
    // Connect ipapi.co with fetch()
    const res = await fetch('https://geolocation-db.com/json/').then(res => res.json());
    // Set the IP address to the constant `ip`
    setIp(res.IPv4);
  }

  // Run `getIP` function above just once when the page is rendered
  useEffect(() => {
    getIp()
  }, [])

  return ip;
}