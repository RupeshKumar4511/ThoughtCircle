const createPostSchema = {
    title:{
        trim:true,
        notEmpty:{
            errorMessage:"title must not empty."
        },
        isString:{
            errorMessage:"title must be a string"
        },
        isLength:{
            options:{
                min:2,
                max:50
            },
            errorMessage:"Title must atleast 2-50 characters long."
        }
        
    },
    body:{
        trim:true,
        notEmpty:{
            errorMessage:"body must not empty."
        },
        isString:{
            errorMessage:"body must be a string"
        },
        isLength:{
            options:{
                min:10,
                max:100
            },
            errorMessage:"body must atleast 10-1000 characters long."
        }
        
    },
    tags:{
        trim:true,
        notEmpty:{
            errorMessage:"tags must not empty."
        },
        isString:{
            errorMessage:"tags must be a string"
        },
        isLength:{
            options:{
                min:2,
                max:200
            },
            errorMessage:"Tags must atleast 2-200 characters long."
        }
        
    }
}

const updatePostSchema = {
    title:{
        optional:{
            options:{
                checkFalsy:true
            }
        },
        trim:true,
        notEmpty:{
            errorMessage:"title must not empty."
        },
        isString:{
            errorMessage:"title must be a string"
        },
        isLength:{
            options:{
                min:2,
                max:50
            },
            errorMessage:"Title must atleast 2-50 characters long."
        }
        
    },
    body:{
        optional:{
            options:{
                checkFalsy:true
            }
        },
        trim:true,
        notEmpty:{
            errorMessage:"body must not empty."
        },
        isString:{
            errorMessage:"body must be a string"
        },
        isLength:{
            options:{
                min:10,
                max:100
            },
            errorMessage:"body must atleast 10-1000 characters long."
        }
        
    },
    tags:{
        optional:{
            options:{
                checkFalsy:true
            }
        },
        trim:true,
        notEmpty:{
            errorMessage:"tags must not empty."
        },
        isString:{
            errorMessage:"tags must be a string"
        },
        isLength:{
            options:{
                min:2,
                max:200
            },
            errorMessage:"Tags must atleast 2-200 characters long."
        }
        
    }
}

const deletePostSchema = {
    id: {
        in: ['params'],
        trim: true,
        notEmpty: {
            errorMessage: "id is required"
        },
        isString: {
            errorMessage: "id must be a string"
        }
    }
}




module.exports = {
    createPostSchema,
    updatePostSchema,
    deletePostSchema,
}