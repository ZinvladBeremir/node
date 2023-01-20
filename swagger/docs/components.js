module.exports = {
    components:{
        schemas:{
            id:{
                type:'string',
                description:"An id of a todo",
                example: "63c8fa6f2e0b4cd5b641c402"
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
                    end_date:{
                        type:'string',
                        description:"Todo's end date",
                        example:"12-03-3023"
                    },
                    isMarked:{
                        type:'boolean',
                        description:"Todo's end date",
                        example:"false"
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
                    },
                    end_date:{
                        type:'string',
                        description:"Todo's end date",
                        example:"12-03-3023"
                    },
                    isMarked:{
                        type:'boolean',
                        description:"Todo's end date",
                        example:"false"
                    },
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
                    },
                    end_date:{
                        type:'string',
                        description:"Todo's end date",
                        example:"12-03-3023"
                    },
                    isMarked:{
                        type:'boolean',
                        description:"Todo's end date",
                        example:"false"
                    },
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
