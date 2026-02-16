const express = require('express');
const request = require('supertest');

const app= express();

app.get("/api",(req,res) =>{
    res.json({
        message: "backend working"
    })
})

test("GET /api returns message",async ()=>{
    const res= await request(app).get("/api");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("backend working");
})