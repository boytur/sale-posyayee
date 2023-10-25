// นำเข้าโมดูล

export const auth = (response, next) => {
    if (window !== "undefined"){
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("user", JSON.stringify(response.data.username));

    }
    next();
};
