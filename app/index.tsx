import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";

export default function index() {
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const subscription = async () => {
            const token = SecureStore.getItem("accessToken");
            setLoggedInUser(token ? true : false);
            setLoading(false);
        };
        subscription();
    }, []);
    return (
        <>
            {loading ? (
                <></>
            ) : (
                <Redirect
                    href={!loggedInUser ? "/(routes)/onboarding" : "/(tabs)"}
                />
            )}
        </>
    );
}
