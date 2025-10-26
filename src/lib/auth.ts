import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.coerce.number().min(1, "Age must be valid").max(120),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  role: "user" | "admin";
  prakriti?: "vata" | "pitta" | "kapha" | "vata-pitta" | "pitta-kapha" | "vata-kapha";
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const getStoredAuth = (): AuthState => {
  const stored = localStorage.getItem("auth");
  if (stored) {
    return JSON.parse(stored);
  }
  return { user: null, isAuthenticated: false };
};

export const setStoredAuth = (auth: AuthState) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

export const clearStoredAuth = () => {
  localStorage.removeItem("auth");
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem("users");
  if (stored) {
    return JSON.parse(stored);
  }
  // Create default admin
  const defaultAdmin: User = {
    id: "admin-1",
    name: "Admin",
    email: "admin@ayurvedic.com",
    age: 30,
    phone: "1234567890",
    role: "admin",
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem("users", JSON.stringify([defaultAdmin]));
  return [defaultAdmin];
};

export const addUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const updateUser = (userId: string, updates: Partial<User>) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem("users", JSON.stringify(users));
    return users[index];
  }
  return null;
};

export const authenticateUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const stored = localStorage.getItem("passwords");
  const passwords: Record<string, string> = stored ? JSON.parse(stored) : {};
  
  // Default admin password
  if (!passwords["admin@ayurvedic.com"]) {
    passwords["admin@ayurvedic.com"] = "admin123";
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }
  
  const user = users.find(u => u.email === email);
  if (user && passwords[email] === password) {
    return user;
  }
  return null;
};

export const registerUser = (data: z.infer<typeof registerSchema>): { success: boolean; user?: User; error?: string } => {
  const users = getUsers();
  
  if (users.some(u => u.email === data.email)) {
    return { success: false, error: "Email already registered" };
  }
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    age: data.age,
    phone: data.phone,
    role: "user",
    createdAt: new Date().toISOString(),
  };
  
  addUser(newUser);
  
  const stored = localStorage.getItem("passwords");
  const passwords: Record<string, string> = stored ? JSON.parse(stored) : {};
  passwords[data.email] = data.password;
  localStorage.setItem("passwords", JSON.stringify(passwords));
  
  return { success: true, user: newUser };
};
