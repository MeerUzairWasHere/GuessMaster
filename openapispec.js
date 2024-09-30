export const openApiSpec = {
    "openapi": "3.0.0",
    "info": {
      "title": "Guess Master",
      "description": "This API allows users to play a number-guessing game, manage user authentication, view leaderboards, and access user profiles.",
      "version": "1.1.0",
      "contact": {
        "name": "Mir Uzair Bashir",
        "email": "meer.uxair007@gmail.com"
      }
    },
    "servers": [
      {
        "url": "https://guessmaster.onrender.com/api/v1",
        "description": "Live server"
      },
      {
        "url": "http://localhost:5000",
        "description": "Local development server"
      },
    ],
    "paths": {
      "/auth/register": {
        "post": {
          "summary": "Register a new user",
          "tags": [
            "Auth"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "John Doe"
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "example": "john.doe@example.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "strongPassword123"
                    }
                  },
                  "required": [
                    "name",
                    "email",
                    "password"
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "User registered successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "msg": {
                        "type": "string",
                        "example": "User registered!"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input"
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/auth/login": {
        "post": {
          "summary": "Log in an existing user",
          "tags": [
            "Auth"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "format": "email",
                      "example": "john.doe@example.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "strongPassword123"
                    }
                  },
                  "required": [
                    "email",
                    "password"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully logged in",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "user": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string",
                            "example": "John Doe"
                          },
                          "email": {
                            "type": "string",
                            "example": "john.doe@example.com"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Invalid credentials"
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/auth/logout": {
        "delete": {
          "summary": "Log out a user",
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully logged out",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "msg": {
                        "type": "string",
                        "example": "user logged out!"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/games": {
        "post": {
          "summary": "Create a new game",
          "tags": [
            "Game"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "difficulty": {
                      "type": "string",
                      "enum": [
                        "easy",
                        "medium",
                        "hard"
                      ],
                      "example": "easy"
                    }
                  },
                  "required": [
                    "difficulty"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Game created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "_id": {
                        "type": "string",
                        "example": "60a6f9b5b6e4a928dcb34b5a"
                      },
                      "userId": {
                        "type": "string",
                        "example": "60a6f9b5b6e4a928dcb34b5a"
                      },
                      "difficulty": {
                        "type": "string",
                        "example": "easy"
                      },
                      "attempts": {
                        "type": "integer",
                        "example": 0
                      },
                      "createdAt": {
                        "type": "string",
                        "format": "date-time"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server Error"
            }
          }
        },
        "get": {
          "summary": "Get all games of the current user",
          "tags": [
            "Game"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully fetched games",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "games": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string",
                              "example": "60a6f9b5b6e4a928dcb34b5a"
                            },
                            "userId": {
                              "type": "string",
                              "example": "60a6f9b5b6e4a928dcb34b5a"
                            },
                            "difficulty": {
                              "type": "string",
                              "example": "easy"
                            },
                            "attempts": {
                              "type": "integer",
                              "example": 2
                            },
                            "createdAt": {
                              "type": "string",
                              "format": "date-time"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/games/{id}": {
        "delete": {
          "summary": "Delete a game by its ID",
          "tags": [
            "Game"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The ID of the game"
            }
          ],
          "responses": {
            "200": {
              "description": "Game deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "msg": {
                        "type": "string",
                        "example": "Deleted Successfully"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Game not found"
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/guess/{gameId}": {
        "post": {
          "summary": "Submit a guess for the game",
          "tags": [
            "Guess"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "gameId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The ID of the game"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "guess": {
                      "type": "integer",
                      "example": 50
                    }
                  },
                  "required": [
                    "guess"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Guess result",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "result": {
                        "type": "string",
                        "example": "50 is too low!"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Game not found"
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/leaderboard/easy": {
        "get": {
          "summary": "Get the easy leaderboard",
          "tags": [
            "Leaderboard"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully fetched leaderboard",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "example": "John Doe"
                        },
                        "easyAttempt": {
                          "type": "integer",
                          "example": 5
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/leaderboard/medium": {
        "get": {
          "summary": "Get the medium leaderboard",
          "tags": [
            "Leaderboard"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully fetched leaderboard",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "example": "John Doe"
                        },
                        "mediumAttempt": {
                          "type": "integer",
                          "example": 10
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/leaderboard/hard": {
        "get": {
          "summary": "Get the hard leaderboard",
          "tags": [
            "Leaderboard"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully fetched leaderboard",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "example": "John Doe"
                        },
                        "hardAttempt": {
                          "type": "integer",
                          "example": 15
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      },
      "/users/current-user": {
        "get": {    
          "summary": "Get the current logged-in user's profile",
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully fetched user profile",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "user": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string",
                            "example": "John Doe"
                          },
                          "email": {
                            "type": "string",
                            "example": "john.doe@example.com"
                          },
                          "easyAttempt": {
                            "type": "integer",
                            "example": 5
                          },
                          "mediumAttempt": {
                            "type": "integer",
                            "example": 10
                          },
                          "hardAttempt": {
                            "type": "integer",
                            "example": 15
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server Error"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Game": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "60a6f9b5b6e4a928dcb34b5a"
            },
            "userId": {
              "type": "string",
              "example": "60a6f9b5b6e4a928dcb34b5a"
            },
            "difficulty": {
              "type": "string",
              "example": "easy"
            },
            "secretNumber": {
              "type": "integer",
              "example": 50
            },
            "attempts": {
              "type": "integer",
              "example": 0
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "User": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "John Doe"
            },
            "email": {
              "type": "string",
              "format": "email",
              "example": "john.doe@example.com"
            },
            "easyAttempt": {
              "type": "integer",
              "example": 5
            },
            "mediumAttempt": {
              "type": "integer",
              "example": 10
            },
            "hardAttempt": {
              "type": "integer",
              "example": 15
            }
          }
        },
        "Error": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Invalid Credentials"
            },
            "code": {
              "type": "integer",
              "example": 401
            }
          }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }