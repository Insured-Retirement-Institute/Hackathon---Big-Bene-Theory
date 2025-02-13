import { useState } from "react";
import { IconEdit, IconHome2, IconUser, IconInfoCircle } from "@tabler/icons-react";
import { Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./Navbar.module.scss";
import { Link } from "@tanstack/react-router";

interface NavbarLinkProps {
    icon: any;
    label: string;
    route: string;
}

function NavbarLink({ icon: Icon, label, route }: NavbarLinkProps) {
    const exact = !route.includes("edit-policies");
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                component={Link}
                to={route}
                activeOptions={{ exact }}
                className={classes.link}
                activeProps={{
                    className: classes.link_active,
                }}
            >
                <Icon size={20} stroke={2} />
            </UnstyledButton>
        </Tooltip>
    );
}

const routeLinks = [
    { icon: IconHome2, label: "Users", route: "/" },
    { icon: IconUser, label: "User Policies", route: "/$userId" },
    { icon: IconEdit, label: "Edit My Policies", route: "/$userId/edit-policies/" },
];

export function Navbar({ userId }: { userId: string | number | null }) {
    const filteredLinks =
        userId != null
            ? routeLinks
            : routeLinks.filter((link) => link.label === "Users");

    // Add the About link separately so it always appears
    const links = [
        ...filteredLinks.map((link) => <NavbarLink key={link.label} {...link} />),
        <NavbarLink key="about" icon={IconInfoCircle} label="About" route="/about" />,
    ];

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>
        </nav>
    );
}
