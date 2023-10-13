import { Controller, Delete, Get, Patch, Post, UseGuards, Param, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { ParseIntPipe } from '@nestjs/common';


@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
    constructor(private noteService: NoteService) {

    }
    @Get()
    getNotes(@GetUser('id') userId: number) {
        return this.noteService.getNotes(userId)
    }

    @Get(':id') // example: /notes/123
    getNoteById(@Param('id', ParseIntPipe) noteId: number) {
        return this.noteService.getNoteById(noteId)
    }
    @Post()
    insertNote(
        @GetUser('id') userId: number,
        @Body() insertNoteDTO: InsertNoteDTO
    ) {
        return this.noteService.insertNote(userId, insertNoteDTO)

    }

    @Patch(':id')
    updateNoteById(
        @Param('id', ParseIntPipe) noteId: number,
        @Body() updateNoteDTO: UpdateNoteDTO
    ) {
        return this.noteService.updateNoteById(noteId, updateNoteDTO)

    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    deleteNoteById(@Query('id', ParseIntPipe) noteId: number) {
        return this.noteService.deleteNoteById(noteId)
    }
}
