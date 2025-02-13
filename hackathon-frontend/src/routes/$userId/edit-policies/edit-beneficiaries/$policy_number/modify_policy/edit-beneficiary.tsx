import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/$userId/edit-policies/edit-beneficiaries/$policy_number/modify_policy/edit-beneficiary',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/$userId/edit-policies/edit-beneficiaries/$policy_number/modify_policy/edit-beneficiary"!
    </div>
  )
}
