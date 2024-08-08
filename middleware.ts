import {
  NextRequest,
  NextResponse
} from "next/server";
import axios from "axios";

let baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

let redirectToLogin = (request: NextRequest) => {
  const url = new URL(`/auth/login`, request.url);
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for public routes
  if (pathname.startsWith('/auth') || 
      pathname.startsWith('/api') || 
      pathname.startsWith('/_next') ||
      pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;
  
  if (!token) {
    return redirectToLogin(request);
  }

  try {
    // const userResponse = await axios.get(`${baseUrl}/users/current`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });

    // if (userResponse.status !== 200) {
    //   return redirectToLogin(request);
    // }

    // const user = userResponse.data;

    const response = NextResponse.next();

    // response.headers.set('x-user', JSON.stringify(user));

    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}