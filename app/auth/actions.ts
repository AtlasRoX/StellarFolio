"use server"

export async function verifySecretCode(code: string): Promise<{ success: boolean; error?: string }> {
  // The secret code is stored securely on the server
  const SECRET_CODE = process.env.ADMIN_SECRET_CODE || "ADMIN2024"

  if (code === SECRET_CODE) {
    return { success: true }
  }

  return { success: false, error: "Invalid access code. Please try again." }
}
