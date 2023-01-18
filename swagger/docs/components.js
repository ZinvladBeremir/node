module.exports = {
    components:{
        schemas:{
            id:{
                type:'string',
                description:"An id of a todo",
                example: "63c6f4c23b76154939dc6ebc"
            },
            Todo:{
                type:'object',
                properties:{
                    _id:{
                        type:'string',
                        description:"Todo identification number",
                        example:"63c5d50837e5f392749f968a"
                    },
                    text:{
                        type:'string',
                        description:"Todo's title",
                        example:"Coding in JavaScript"
                    },
                    createdAt:{
                        type:'string',
                        description:"Todo's createdAt",
                        example:"2023-01-18T11:15:40.295Z"
                    },
                    updatedAt:{
                        type:'string',
                        description:"Todo's updatedAt",
                        example:"2023-01-18T11:15:40.295Z"
                    }
                }
            },
            TodoCreate:{
                type:'object',
                properties:{
                    text:{
                        type:'string',
                        description:"Todo's title",
                        example:"Coding in JavaScript"
                    }
                }
            },
            TodoUpdate:{
                type:'object',
                properties:{
                    id:{
                        type:'string',
                        description:"Todo's id",
                        example:"63c6f4c23b76154939dc6ebc"
                    },
                    text:{
                        type:'string',
                        description:"Todo's title",
                        example:"Coding in JavaScript"
                    }
                }
            },
            Error:{
                type:'object',
                properties:{
                    message:{
                        type:'string'
                    },
                    internal_code:{
                        type:'string'
                    }
                }
            }
        }
    }
}
