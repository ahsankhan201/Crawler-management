export interface IProxy {
    data?: (Proxy)[] | null;
}
export interface Proxy {
    id: number;
    name: string;
    description: string;
    hostname: string;
    port: number;
    username: string;
    password: string;
    type?: string | null;
    active: number;
    updated_at: string;
    created_at: string;
    user_id: number;
    user: User;
    crawler?: Crawler | null;
}
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at?: null;
    updated_at?: null;
    photo_url: string;
}
export interface Crawler {
    id: number;
    name: string;
    description: string;
    active: number;
    new: number;
    testing: number;
    updated: number;
    updated_at: string;
    created_at: string;
    experiment_id: number;
    user_id: number;
    proxy_id: number;
    agent_id: number;
    configuration_id: number;
    latest_queues_succeeded: number;
    latest_queues_failed: number;
    latest_queues_count: number;
}
