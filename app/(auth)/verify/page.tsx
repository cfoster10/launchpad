import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>We sent you a sign-in link. Click it to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">The link expires in 24 hours.</p>
        </CardContent>
      </Card>
    </div>
  )
}
