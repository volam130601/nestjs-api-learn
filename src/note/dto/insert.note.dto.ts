import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InsertNoteDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;
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