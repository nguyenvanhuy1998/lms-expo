import axios from "axios";
import { useEffect, useState } from "react";

const useGetCourses = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_SERVER_URI}/get-courses`
                );
                setCourses(response.data.courses);
            } catch (error: any) {
                console.log("error", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);
    return { courses, loading, error };
};
export default useGetCourses;
