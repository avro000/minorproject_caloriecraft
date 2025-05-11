import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CheckoutButton from "../Payment/CheckoutButton";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { UserNavbar } from "./UserNavbar";

interface Course {
  courseId: number;
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  language: string;
  thumbnailUrl: string;
  published: boolean;
}

const UserDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  let userEmail: string | null = null;

  if (token) {
    const decoded: any = jwtDecode(token);
    userEmail = decoded.sub;
  }

  useEffect(() => {
    if (!token) {
      setError("Authentication token is missing");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:9092/auth/fetch-all-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load courses");
        setLoading(false);
      });
  }, [token]);

  if (!userEmail) {
    return <p>Please log in to access your dashboard.</p>;
  }

  return (
    <div>
      <UserNavbar/>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course.courseId} className="rounded-2xl transition duration-300 group pt-0">
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 z-40">
                  <Badge className="bg-white/10 backdrop-blur-md text-card-foreground border border-white/20 shadow-md text-sm">
                    ₹ {course.price}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                <CardDescription className="text-sm">{course.description}</CardDescription>
                <div>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="text-sm space-y-2">
                <div>
                  <Badge variant="secondary">{course.level}</Badge> |{" "}
                  <Badge variant="secondary">{course.language}</Badge>
                </div>

                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  {/* <Avatar className="h-7 w-7">
                    <AvatarImage src={instructor?.picture || ""} alt={instructor?.name || "User"} />
                    <AvatarFallback className="rounded-lg">
                      {instructor?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar> */}
                  {/* <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-semibold text-xs">by, {instructor?.name || "User"}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {instructor?.sub || "Loading..."}
                    </span>
                  </div> */}
                  <CheckoutButton
                    userEmail={userEmail}
                    courseId={course.courseId}
                    price={course.price}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Alert className="border-red-500 text-red-500">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>No course available.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
