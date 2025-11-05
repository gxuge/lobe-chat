ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "password_hash" text;

-- Add comment to explain the column
COMMENT ON COLUMN "users"."password_hash" IS 'Hashed password for credentials-based authentication';

