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
