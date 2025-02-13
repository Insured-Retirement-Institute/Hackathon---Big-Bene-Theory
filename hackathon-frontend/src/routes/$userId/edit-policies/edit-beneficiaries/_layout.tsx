import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Stack, Title } from '@mantine/core'

export const Route = createFileRoute(
  '/$userId/edit-policies/edit-beneficiaries/_layout',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack style={{ flexGrow: 1, maxWidth: '80rem' }}>
      <Title>Beneficiaries</Title>
      <Outlet />
    </Stack>
  )
}
