import { ForbiddenException, Injectable } from "@nestjs/common";
import { InsertNoteDTO, UpdateNoteDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable({})
export class NoteService {
    constructor(private prismaService: PrismaService) {

    }

    async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
        const note = await this.prismaService.note.create({
            data: {
                ...insertNoteDTO,
                userId,
            }
        });
        return note;
    }


    getNotes(userId: number) {
        const notes = this.prismaService.note.findMany({
            where: {
                userId: userId
            }
        })
        return notes
    }
    getNoteById(noteId: number) {
        const note = this.prismaService.note.findFirst({
            where: {
                id: noteId
            }
        })
        return note
    }



    updateNoteById(
        noteId: number,
        updateNoteDTO: UpdateNoteDTO
    ) {
        const note = this.prismaService.note.findUnique({
            where: {
                id: noteId
            }
        })
        if (!note) {
            throw new ForbiddenException('Cannot find Note to update')
        }
        return this.prismaService.note.update({
            where: {
                id: noteId
            },
            data: { ...updateNoteDTO }
        })
    }


    async deleteNoteById(noteId: number) {
        const note = this.prismaService.note.findUnique({
            where: {
                id: noteId
            }
        })
        if (!note) {
            throw new ForbiddenException('Cannot find Note to delete')
        }
        return this.prismaService.note.delete({
            where: {
                id: noteId
            }
        })
    }
}