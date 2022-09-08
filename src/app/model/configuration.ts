export interface Configurations {
    data?: (Configuration)[] | null;
}
export interface Configuration {
    id: number;
    name: string;
    description?: string | null;
    active: number;
    updated_at: string;
    created_at: string;
    user_id: number;
    crawler?: Crawler | null;
    params?: (ParamsEntity | null)[] | null;
    preferences?: (PreferencesEntity | null)[] | null;
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
export interface ParamsEntity {
    id: number;
    pi?: string | null;
    psi?: string | null;
    kappa?: string | null;
    tau?: string | null;
    beta?: string | null;
    alpha?: string | null;
    search_terms?: string | null;
    media_outlet_urls?: string | null;
    updated_at: string;
    created_at: string;
    user_id: number;
    configuration_id: number;
}
export interface PreferencesEntity {
    id: number;
    name: string;
    description: string;
    preferencable_type: string;
    preferencable_id: number;
    value: string;
    active: number;
    updated_at: string;
    created_at: string;
    user_id: number;
}
