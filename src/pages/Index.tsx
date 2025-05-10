
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, Calendar, Clock } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Simplify Your Volunteer Management
            </h1>
            <p className="text-xl mb-8">
              VolunteerTrack helps organizations manage, coordinate, and engage volunteers effectively.
              Track hours, assign tasks, and recognize your community heroes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Volunteer Management</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to coordinate volunteers and track their impact in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Volunteer Directory</h3>
                <p className="text-gray-600">
                  Maintain detailed profiles of your volunteers, including skills, availability, and contact information.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Event Management</h3>
                <p className="text-gray-600">
                  Create and manage events, assign volunteers, and send automated reminders to ensure smooth operations.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hour Tracking</h3>
                <p className="text-gray-600">
                  Accurately track volunteer hours with check-in/check-out functionality and generate reports for grants.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How VolunteerTrack Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, effective process to manage your volunteer program
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Register Volunteers</h3>
              <p className="text-gray-600">
                Create profiles for your volunteers with all their relevant information and skills
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Create Events</h3>
              <p className="text-gray-600">
                Schedule events, assign volunteer roles, and manage sign-ups all in one place
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Track Impact</h3>
              <p className="text-gray-600">
                Monitor attendance, track hours, and generate reports to measure your program's impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organizations of all sizes trust VolunteerTrack for their volunteer management needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                    JD
                  </div>
                  <div>
                    <h4 className="font-bold">Jane Doe</h4>
                    <p className="text-sm text-gray-500">Volunteer Coordinator, Coastal Cleanup</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "VolunteerTrack has revolutionized how we manage our beach cleanup events. We can now effortlessly track hours and generate reports for our funders."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                    MS
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Smith</h4>
                    <p className="text-sm text-gray-500">Director, Community Food Bank</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Managing hundreds of volunteers used to be overwhelming. With VolunteerTrack, we've streamlined our operations and improved volunteer retention."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                    SG
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Garcia</h4>
                    <p className="text-sm text-gray-500">Executive Director, Youth Mentoring</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The reporting features alone are worth it. We can now show our board and donors exactly how our volunteer program is making an impact."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Volunteer Program?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that use VolunteerTrack to engage their volunteers and maximize impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
