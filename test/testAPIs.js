let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Test challengeTypes API', () => {
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

describe('Test playlists API', () => {
    describe("Test GET /api/playlists/", () => {
        it("GET requests should return status 200",(done)=>{
            chai.request(server)
                .get("/api/playlists/UC_x5XG1OV2P6uZZ5FSM9Ttw")
                .set("Content-Type", "application/json")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body[0].should.have.property('kind').equal("youtube#playlist");
                    done();
                })
        })

        it("GET requests should return playlist objects",(done)=>{
            chai.request(server)
                .get("/api/playlists/UC_x5XG1OV2P6uZZ5FSM9Ttw")
                .set("Content-Type", "application/json")
                .end((err, response) => {
                    response.body[0].should.have.property('kind').equal("youtube#playlist");
                    done();
                })
        })

        it("GET requests should return 50 playlist objects",(done)=>{
            chai.request(server)
                .get("/api/playlists/UC_x5XG1OV2P6uZZ5FSM9Ttw")
                .set("Content-Type", "application/json")
                .end((err, response) => {
                    response.body.should.have.length(50)
                    done();
                })
        })
    })
})