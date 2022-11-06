let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Test API', () => {
    describe("Test GET /api/tests", () => {
        it("GET requests should return status 200",(done)=>{
            chai.request(server)
                .get("/api/tests")
                .set("Content-Type", "application/json")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body[0].should.have.property('testMsg').equal("Welcome to CSC302 Assignments! Connected to database!");
                    done();
                })
        })
    })
})

describe('Test channel API', () => {
    describe("Test GET /api/channels/:id", () => {
        it("GET requests should return status 200 for youtube channel UC_x5XG1OV2P6uZZ5FSM9Ttw",(done)=>{
            chai.request(server)
                .get("/api/channels/UC_x5XG1OV2P6uZZ5FSM9Ttw")
                .set("Content-Type", "application/json")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body[0].should.have.property('kind').equal("youtube#channel");
                    response.body.should.have.length(1);
                    done();
                })
        })
    })
})

describe('Test playlists API', () => {
    describe("Test GET /api/playlists/:id", () => {
        it("GET requests should return status 200 and return 50 playlist objects for youtube channel UC_x5XG1OV2P6uZZ5FSM9Ttw",(done)=>{
            chai.request(server)
                .get("/api/playlists/UC_x5XG1OV2P6uZZ5FSM9Ttw")
                .set("Content-Type", "application/json")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body[0].should.have.property('kind').equal("youtube#playlist");
                    response.body.should.have.length(50);
                    done();
                })
        })
    })
})

describe('Test videos API', () => {
    describe("Test GET /api/videos/:id", () => {
        it("GET requests should return status 200 and return 50 video objects for youtube channel UC_x5XG1OV2P6uZZ5FSM9Ttw",(done)=>{
            chai.request(server)
                .get("/api/videos/UC_x5XG1OV2P6uZZ5FSM9Ttw")
                .set("Content-Type", "application/json")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body[0].should.have.property('kind').equal("youtube#video");
                    response.body.should.have.length(50);
                    done();
                })
        })
    })
})