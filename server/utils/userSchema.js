const signUpSchema = {
    otp:{
        trim:true,
        notEmpty:{
            errorMessage:"otp must not empty"
        }
    },
    username:{
        trim:true,
        toLowerCase:true,
        notEmpty:{
            errorMessage:"username must not empty."
        },
        isString:{
            errorMessage:"Username must be a string"
        },
        isLength:{
            options:{
                min:3,
                max:32
            },
            errorMessage:"Username must atleast 3-32 characters long."
        }
        
    },
    email:{
        trim:true,
        toLowerCase: true,
        notEmpty:{
            errorMessage:"email id must not empty."
        },
        isString:{
            errorMessage:"email id must be a string"
        },
        isLength:{
            options:{
                min:5,
                max:52
            },
            errorMessage:"email id must atleast 5-52 characters long."
        },
        matches:{
            options:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage:"Email Id is not valid"
        }

    },
    password:{
        trim:true,
        notEmpty:{
            errorMessage:"password must not empty."
        },
        isString:{
            errorMessage:"password must be a string"
        },
        isLength:{
            options:{
                min:8,
                max:32
            },
            errorMessage:"password must atleast 8-32 characters long."
        },
        matches:{
            options:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage:"password is not valid"
        }

    }
}


const signInSchema = {
    username:{
        trim:true,
        toLowerCase:true,
        notEmpty:{
            errorMessage:"username must not empty."
        },
        isString:{
            errorMessage:"Username must be a string"
        },
        isLength:{
            options:{
                min:3,
                max:32
            },
            errorMessage:"Username must atleast 3-32 characters long."
        }
        
    },
    password:{
        trim:true,
        notEmpty:{
            errorMessage:"password must not empty."
        },
        isString:{
            errorMessage:"password must be a string"
        },
        isLength:{
            options:{
                min:8,
                max:32
            },
            errorMessage:"password must atleast 8-32 characters long."
        },
        matches:{
            options:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage:"password is not valid"
        }

    }
}
const resetSchema = {
     email:{
        trim:true,
        toLowerCase:true,
        notEmpty:{
            errorMessage:"email id must not empty."
        },
        isString:{
            errorMessage:"email id must be a string"
        },
        isLength:{
            options:{
                min:5,
                max:52
            },
            errorMessage:"email id must atleast 5-52 characters long."
        },
        matches:{
            options:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage:"Email Id is not valid"
        }

    },
    password:{
        trim:true,
        notEmpty:{
            errorMessage:"password must not empty."
        },
        isString:{
            errorMessage:"password must be a string"
        },
        isLength:{
            options:{
                min:8,
                max:32
            },
            errorMessage:"password must atleast 8-32 characters long."
        },
        matches:{
            options:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage:"password is not valid"
        }

    }
}

module.exports = {
    signUpSchema,
    signInSchema,
    resetSchema
}