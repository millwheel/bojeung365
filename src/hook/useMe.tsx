"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import { UserProfile } from "@/type/userType";

export function useMe() {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const { data } = await apiGet<UserProfile>("/me");
            return data ?? null;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 0,
    });

    const setMe = (value: UserProfile | null) =>
        queryClient.setQueryData(["me"], value);

    const refreshMe = () => queryClient.invalidateQueries({ queryKey: ["me"] });

    return { ...query, me: query.data, setMe, refreshMe };
}