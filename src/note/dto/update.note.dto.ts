import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateNoteDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  url?: string;
}

/**model Note {
  id          Int    @id @default(autoincrement())
  title       String
  description String
  url         String

  createAt  DateTime @default(now())
  updatedAt DateTime @updatedAt
  //relationship
  userId    Int
  user      User     @relation(fields: [userId], references: [id])

  @@map("notes")
} */