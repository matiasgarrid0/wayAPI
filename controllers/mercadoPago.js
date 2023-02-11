const axios = require('axios');
const dotenv = require('dotenv');
const mercadopago = require('mercadopago');
dotenv.config();
module.exports = {
    pagar: async (payload) => {
        try {
            console.log(payload);
            const url = "https://api.mercadopago.com/checkout/preferences";
            mercadopago.configure({
                access_token: process.env.ACCESS_TOKEN,
            });
            let producto = {
                title: payload.title,
                unit_price: payload.unit_price,
                description: payload.description,
                quantity: 1
            }
            let preference = {
                items: payload,
            }
            const respuesta = await mercadopago.preferences.create(preference);
            return respuesta.body.init_point;
            
            /*const body = {
                payer_email: 'test_user_1299014971@testuser.com',
                items: [
                    payload
                ],
                back_urls: {
                  failure: "/failure",
                  pending: "/pending",
                  success: "/success"
                }
            }
            const payment = await axios.post(url, body, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
              });
          
              return payment.data;*/
        } catch (err) {
            return err;
        }
    }
}
/*
const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_46945293@testuser.com",
      items: [
        {
          title: "Servicios de programacion",
          description: "Leandro y Mati programan para pagar la joda del país",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 30000
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data; */