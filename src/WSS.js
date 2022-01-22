import { useEffect, useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";

function WSS() {
  const [crypto, setCrypto] = useState("btcusdt");
  const [price, setprice] = useState([]);
  const [Amount, setAmount] = useState([]);

  const ws = useRef(null);

  const handleChange = (event) => {
    setCrypto(event.target.value);
  };
  useEffect(() => {
    ws.current = new WebSocket(
      `wss://stream.binance.com:9443/ws/${crypto}@trade`
    );
  }, []);

  useEffect(() => {
    let tempPrice = [];
    let tempAmount = [];
    const apiCall = () => {
      ws.current.onmessage = (event) => {
        let data = JSON.parse(event.data);
        tempPrice.push(data.p);
        tempAmount.push(data.q);
      };
    };
    apiCall();
    console.log(tempAmount);
  }, [crypto]);
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              orders
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <DarkModeIcon />
            </IconButton>

            <FormControl sx={{ minWidth: 120 }}>
              <Select value={crypto} onChange={handleChange} color="secondary">
                <MenuItem value={"btcusdt"}>BTC/USDT</MenuItem>
                <MenuItem value={"ethusdt"}>ETH/USDT</MenuItem>
                <MenuItem value={"adausdt"}>ADA/USDT</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>price</h3>

        <h3>Amount</h3>
      </div>
      <div style={{ display: "", justifyContent: "space-around" }}>
        {price.map((price, idx) => (
          <p key={idx}>{price}</p>
        ))}
        {Amount && Amount.map((Amount, idx) => <p key={idx}>{Amount}</p>)}
      </div>
    </>
  );
}

export default WSS;
