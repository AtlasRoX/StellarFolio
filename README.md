# GhostCache - Developer Portfolio

This is a dynamic and customizable developer portfolio application built with Next.js and Supabase. It's designed to showcase your skills, experience, and projects in a professional and visually appealing way.

## Key Features

*   **Dynamic Content:** All portfolio data (personal info, experience, education, skills, projects, etc.) is fetched from a Supabase backend, making it easy to update and manage.
*   **Multiple View Modes:** View the portfolio in different modes, such as "Normal," "Story," "Recruiter," and "Client," to tailor the information to your audience.
*   **Theming:** Switch between different themes ("Minimal," "Dark," "Aurora," and "Glass") to change the look and feel of the portfolio.
*   **Export to PDF:** Easily export your portfolio to a PDF document.
*   **Admin Dashboard:** A dedicated admin section to manage your portfolio data.
*   **Authentication:** Secure authentication powered by Supabase.

## Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Backend:** [Supabase](https://supabase.io/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/)
*   **Schema Validation:** [Zod](https://zod.dev/)
*   **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and pnpm installed on your machine.
*   A Supabase project set up.

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/ghostcache-devportfolio.git
    ```
2.  **Install NPM packages**
    ```sh
    pnpm install
    ```
3.  **Set up environment variables**

    Create a `.env.local` file in the root of the project and add your Supabase project URL and anon key:

    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the development server**
    ```sh
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

Distributed under the MIT License. See `LICENSE` for more information.