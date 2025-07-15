const signUpSchema = {
    otp:{
        notEmpty:{
            errorMsg:"otp must not empty"
        }
    },
    username:{
        notEmpty:{
            errorMsg:"username must not empty."
        },
        isString:{
            errorMsg:"Username must be a string"
        },
        isLength:{
            options:{
                min:3,
                max:32
            },
            errorMsg:"Username must atleast 3-32 characters long."
        }
        
    },
    email:{
        notEmpty:{
            errorMsg:"email id must not empty."
        },
        isString:{
            errorMsg:"email id must be a string"
        },
        isLength:{
            options:{
                min:5,
                max:52
            },
            errorMsg:"email id must atleast 5-52 characters long."
        },
        matches:{
            options:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMsg:"Email Id is not valid"
        }

    },
    password:{
        notEmpty:{
            errorMsg:"password must not empty."
        },
        isString:{
            errorMsg:"password must be a string"
        },
        isLength:{
            options:{
                min:8,
                max:32
            },
            errorMsg:"password must atleast 8-32 characters long."
        },
        matches:{
            options:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMsg:"password is not valid"
        }

    }
}


const signInSchema = {
    username:{
        notEmpty:{
            errorMsg:"username must not empty."
        },
        isString:{
            errorMsg:"Username must be a string"
        },
        isLength:{
            options:{
                min:3,
                max:32
            },
            errorMsg:"Username must atleast 3-32 characters long."
        }
        
    },
    password:{
        notEmpty:{
            errorMsg:"password must not empty."
        },
        isString:{
            errorMsg:"password must be a string"
        },
        isLength:{
            options:{
                min:8,
                max:32
            },
            errorMsg:"password must atleast 8-32 characters long."
        },
        matches:{
            options:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMsg:"password is not valid"
        }

    }
}
const resetSchema = {
     email:{
        notEmpty:{
            errorMsg:"email id must not empty."
        },
        isString:{
            errorMsg:"email id must be a string"
        },
        isLength:{
            options:{
                min:5,
                max:52
            },
            errorMsg:"email id must atleast 5-52 characters long."
        },
        matches:{
            options:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMsg:"Email Id is not valid"
        }

    },
    password:{
        notEmpty:{
            errorMsg:"password must not empty."
        },
        isString:{
            errorMsg:"password must be a string"
        },
        isLength:{
            options:{
                min:8,
                max:32
            },
            errorMsg:"password must atleast 8-32 characters long."
        },
        matches:{
            options:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMsg:"password is not valid"
        }

    }
}

module.exports = {
    signUpSchema,
    signInSchema,
    resetSchema
}