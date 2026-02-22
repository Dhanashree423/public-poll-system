// localStorage-based auth and voting store

export interface User {
  id: string;
  email: string;
  name: string;
  votedPolls: string[];
  createdAt: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  category: string;
  status: "active" | "closed";
  createdAt: string;
  endsAt: string;
}

const USERS_KEY = "pulsevote_users";
const CURRENT_USER_KEY = "pulsevote_current_user";
const POLLS_KEY = "pulsevote_polls";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

// --- Users ---
function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signup(email: string, password: string, name: string): { success: boolean; error?: string } {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, error: "An account with this email already exists." };
  }
  const user: User = { id: generateId(), email, name, votedPolls: [], createdAt: new Date().toISOString() };
  users.push(user);
  saveUsers(users);
  // Store password separately (hashed in real app)
  const passwords = JSON.parse(localStorage.getItem("pulsevote_passwords") || "{}");
  passwords[email] = password;
  localStorage.setItem("pulsevote_passwords", JSON.stringify(passwords));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true };
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { success: false, error: "No account found with this email." };
  const passwords = JSON.parse(localStorage.getItem("pulsevote_passwords") || "{}");
  if (passwords[email] !== password) return { success: false, error: "Incorrect password." };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true };
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

// --- Polls ---
function getDefaultPolls(): Poll[] {
  return [
    {
      id: "poll1",
      title: "Best Programming Language for 2026?",
      description: "Vote for the programming language you think will dominate in 2026.",
      options: [
        { id: "o1", text: "TypeScript", votes: 42 },
        { id: "o2", text: "Python", votes: 38 },
        { id: "o3", text: "Rust", votes: 25 },
        { id: "o4", text: "Go", votes: 18 },
      ],
      category: "Technology",
      status: "active",
      createdAt: "2026-02-01T00:00:00Z",
      endsAt: "2026-03-15T00:00:00Z",
    },
    {
      id: "poll2",
      title: "Should Remote Work Be the Default?",
      description: "Share your opinion on the future of work arrangements.",
      options: [
        { id: "o5", text: "Yes, fully remote", votes: 55 },
        { id: "o6", text: "Hybrid model", votes: 40 },
        { id: "o7", text: "No, in-office is better", votes: 12 },
      ],
      category: "Workplace",
      status: "active",
      createdAt: "2026-02-10T00:00:00Z",
      endsAt: "2026-03-20T00:00:00Z",
    },
    {
      id: "poll3",
      title: "Favorite Renewable Energy Source?",
      description: "Which renewable energy source do you believe has the most potential?",
      options: [
        { id: "o8", text: "Solar", votes: 60 },
        { id: "o9", text: "Wind", votes: 35 },
        { id: "o10", text: "Nuclear Fusion", votes: 28 },
        { id: "o11", text: "Hydroelectric", votes: 15 },
      ],
      category: "Environment",
      status: "active",
      createdAt: "2026-02-05T00:00:00Z",
      endsAt: "2026-03-25T00:00:00Z",
    },
    {
      id: "poll4",
      title: "Best Sci-Fi Movie of All Time?",
      description: "Cast your vote for the greatest science fiction film ever made.",
      options: [
        { id: "o12", text: "Blade Runner 2049", votes: 30 },
        { id: "o13", text: "Interstellar", votes: 45 },
        { id: "o14", text: "The Matrix", votes: 38 },
        { id: "o15", text: "2001: A Space Odyssey", votes: 20 },
      ],
      category: "Entertainment",
      status: "closed",
      createdAt: "2026-01-01T00:00:00Z",
      endsAt: "2026-02-01T00:00:00Z",
    },
    {
      id: "poll5",
      title: "Should AI Be Regulated?",
      description: "What level of regulation should artificial intelligence have?",
      options: [
        { id: "o16", text: "Strict global regulation", votes: 32 },
        { id: "o17", text: "Light industry self-regulation", votes: 28 },
        { id: "o18", text: "No regulation needed", votes: 10 },
      ],
      category: "Technology",
      status: "closed",
      createdAt: "2026-01-10T00:00:00Z",
      endsAt: "2026-02-10T00:00:00Z",
    },
  ];
}

export function getPolls(): Poll[] {
  const stored = localStorage.getItem(POLLS_KEY);
  if (!stored) {
    const defaults = getDefaultPolls();
    localStorage.setItem(POLLS_KEY, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(stored);
}

export function getPollById(id: string): Poll | undefined {
  return getPolls().find((p) => p.id === id);
}

export function castVote(pollId: string, optionId: string): { success: boolean; error?: string } {
  const user = getCurrentUser();
  if (!user) return { success: false, error: "You must be logged in to vote." };

  if (user.votedPolls.includes(pollId)) {
    return { success: false, error: "You have already voted on this poll." };
  }

  const polls = getPolls();
  const poll = polls.find((p) => p.id === pollId);
  if (!poll) return { success: false, error: "Poll not found." };
  if (poll.status === "closed") return { success: false, error: "This poll is closed." };

  const option = poll.options.find((o) => o.id === optionId);
  if (!option) return { success: false, error: "Invalid option." };

  option.votes += 1;
  localStorage.setItem(POLLS_KEY, JSON.stringify(polls));

  // Update user
  user.votedPolls.push(pollId);
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === user.id);
  if (userIndex >= 0) users[userIndex] = user;
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  return { success: true };
}

export function getUserImpact(): number {
  const user = getCurrentUser();
  return user ? user.votedPolls.length : 0;
}
