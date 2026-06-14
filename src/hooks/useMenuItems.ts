import {menuItems} from "@constants/menuItems/menuItems.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import type {MenuItems} from "@/types/common.ts";

function findActiveOpenKeys(items: MenuItems[], currentPath: string): string[] {
    for (const item of items) {
        if (item.children) {
            const hasDirectChild = item.children.some(child => child.key === currentPath);

            if (hasDirectChild) {
                return [item.key];
            }

            const subFolderKeys = findActiveOpenKeys(item.children, currentPath);

            if (subFolderKeys.length > 0) {
                return [item.key, ...subFolderKeys];
            }
        }
    }
    return [];
}

export default function useMenuItems() {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>(findActiveOpenKeys(menuItems, location.pathname));

    useEffect(() => {
        findActiveOpenKeys(menuItems, location.pathname);
    }, [location.pathname]);

    return {menuItems, openKeys, setOpenKeys};
}