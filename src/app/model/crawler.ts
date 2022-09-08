export interface ICrawler {
    data?: (Crawler)[] | null;
    links: Links;
    meta: Meta;
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
    experiment: Experiment;
}
export interface Experiment {
    id: number;
    name: string;
    description: string;
    contact: string;
    active: number;
    updated_at: string;
    created_at: string;
    user_id: number;
}
export interface Links {
    first: string;
    last: string;
    prev?: null;
    next: string;
}
export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links?: (LinksEntity)[] | null;
    path: string;
    per_page: number;
    to: number;
    total: number;
}
export interface LinksEntity {
    url?: string | null;
    label: string;
    active: boolean;
}
