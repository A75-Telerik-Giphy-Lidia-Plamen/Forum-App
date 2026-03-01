
# Forgotten Knowledge

> *"The best time to learn something was yesterday. The second best time is now."*

We live in a world where you can ask AI anything — but somewhere along the way, we stopped knowing how to do things ourselves. Forgotten Knowledge is a forum for sharing the practical skills and techniques that people used before Google existed. How to sharpen a knife. How to read a map. How to grow your own food. The stuff that actually matters when the internet goes down.

---

## Features

- Register an account and set up your profile
- Write posts and share what you know
- Tag your posts so others can find them
- Like, dislike and comment on posts
- Build reputation by contributing quality content
- Earn badges for reaching milestones
- Search and filter posts by topic or keyword
- Admins can block users, delete posts, and keep the community clean

---

## Running it locally

You will need Node.js v18+ and a Supabase project before you start.

**1. Clone the repo**

    git clone https://github.com/A75-Telerik-Giphy-Lidia-Plamen/Forum-App.git
    cd Forum-App

**2. Install dependencies**

    cd frontend
    npm install

**3. Add your environment variables**

Create a `.env` file inside `frontend/`:

    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Both values are in your Supabase project under **Settings → API**.

**4. Start the app**

    npm run dev

Open `http://localhost:5173` and you are good to go.

---

## Project structure

    Forum-App/
    ├── frontend/
    │   ├── public/
    │   └── src/
    │       ├── assets/           # Fonts, icons, images
    │       ├── components/
    │       │   ├── auth/         # Login and register forms
    │       │   ├── AuthorCard/
    │       │   ├── CommentSection/
    │       │   ├── Header/
    │       │   ├── Home/         # Hero banner, stats, tags
    │       │   ├── PostCard/
    │       │   ├── PostDetails/
    │       │   ├── PostForm/
    │       │   ├── profile/      # Profile page components
    │       │   ├── ui/           # Generic reusable components
    │       │   └── VoteButtons/
    │       ├── config/           # Supabase client setup
    │       ├── context/          # Global user state
    │       ├── hoc/              # Route guards
    │       ├── hooks/            # Custom hooks
    │       ├── pages/
    │       │   ├── admin/        # Admin dashboard
    │       │   ├── Browse/
    │       │   ├── CreatePost/
    │       │   ├── EditPost/
    │       │   └── Profile/
    │       ├── schemas/          # Form validation
    │       ├── services/         # All Supabase queries
    │       └── types/            # TypeScript types
    └── supabase/

---

## Built with

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (database, auth, realtime)
- AWS S3 (media storage)

---

## Database schema

### users

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Links to Supabase auth |
| username | varchar(32) | Unique, cannot be changed after registration |
| first_name | varchar(32) | 4-32 characters |
| last_name | varchar(32) | 4-32 characters |
| email | varchar | Unique |
| role | varchar(10) | user or admin |
| is_blocked | boolean | Blocked users cannot post or comment |
| avatar_url | text | Profile picture |
| bio | text | Optional |
| reputation | numeric | Calculated from votes received |
| created_at | timestamptz | Registration date |

### posts

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| author_id | uuid | References users |
| title | varchar(64) | 16-64 characters |
| content | text | 32-8192 characters |
| is_verified | boolean | Admin verified |
| is_deleted | boolean | Soft delete |
| likes_count | integer | Updated automatically by trigger |
| dislikes_count | integer | Updated automatically by trigger |
| comments_count | integer | Updated automatically by trigger |
| created_at | timestamptz | Creation date |
| updated_at | timestamptz | Last edit date |

### comments

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| post_id | uuid | References posts |
| author_id | uuid | References users |
| content | text | Minimum 16 characters |
| is_deleted | boolean | Soft delete |
| parent_id | uuid | Self-reference for nested replies |
| created_at | timestamptz | Creation date |

### votes

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | References users |
| target_type | varchar(10) | post or comment |
| target_id | uuid | ID of the voted item |
| value | smallint | 1 = upvote, -1 = downvote |
| created_at | timestamptz | Vote date |

### tags

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| name | varchar(32) | Unique, lowercase only |
| created_at | timestamptz | Creation date |

### post_tags

| Column | Type | Notes |
| --- | --- | --- |
| post_id | uuid | References posts |
| tag_id | uuid | References tags |

### badges

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| key | text | Unique badge identifier |
| name | text | Display name |
| description | text | Badge description |
| type | badge_type | Badge category |
| threshold | integer | Milestone required to earn it |
| icon | text | Icon identifier |

### user_badges

| Column | Type | Notes |
| --- | --- | --- |
| user_id | uuid | References users |
| badge_id | uuid | References badges |
| awarded_at | timestamptz | Date badge was earned |

### user_stats

| Column | Type | Notes |
| --- | --- | --- |
| user_id | uuid | References users |
| posts_count | integer | Total posts created |
| comments_count | integer | Total comments written |
| reputation | integer | Reputation score |
| last_badge_check_at | timestamptz | Last badge evaluation |

### reputation_events

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | References users |
| value | integer | Points gained or lost |
| source_type | reputation_source | Reason for the change |
| created_at | timestamptz | Event date |

### reputation_rules

| Column | Type | Notes |
| --- | --- | --- |
| source_type | reputation_source | Primary key |
| points | integer | Points awarded for this action |

### user_media and post_media

Stores metadata for uploaded files hosted on AWS S3. Each record contains the bucket name, object key, public URL, MIME type and file size.

---

## How the database updates itself

| What happens | What updates automatically |
| --- | --- |
| User casts a vote | likes_count or dislikes_count on the post |
| User removes a vote | Count decremented, reputation reversed |
| User posts a comment | comments_count on the post and in user_stats |
| User creates a post | posts_count in user_stats |
| Reputation event created | reputation in user_stats, badges checked |

---

## Contributors

**Lidia Shkortova**

**Plamen Mihaylov**
