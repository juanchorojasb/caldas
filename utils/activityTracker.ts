export class ActivityTracker {
  static async track(type: string, title: string, description: string, metadata?: any) {
    try {
      await fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          title,
          description,
          metadata
        })
      })
    } catch (error) {
      console.error('Error tracking activity:', error)
    }
  }

  static async trackCourseStart(courseId: string, courseTitle: string) {
    await this.track(
      'course_start',
      'Curso iniciado',
      `Comenzaste el curso: ${courseTitle}`,
      { courseId, category: 'education' }
    )
  }

  static async trackCourseComplete(courseId: string, courseTitle: string) {
    await this.track(
      'course_complete',
      'Curso completado',
      `¡Completaste el curso: ${courseTitle}!`,
      { courseId, category: 'education' }
    )
  }

  static async trackLessonComplete(lessonId: string, lessonTitle: string, courseTitle: string) {
    await this.track(
      'lesson_complete',
      'Lección completada',
      `Completaste: ${lessonTitle} en ${courseTitle}`,
      { lessonId, category: 'education' }
    )
  }

  static async trackAIGeneration(tool: string, prompt: string) {
    await this.track(
      'ai_generation',
      'Contenido generado con IA',
      `Usaste ${tool} para generar contenido`,
      { tool, prompt: prompt.substring(0, 100), category: 'ai' }
    )
  }

  static async trackAchievement(achievementId: string, achievementTitle: string) {
    await this.track(
      'achievement',
      'Logro desbloqueado',
      `¡Desbloqueaste: ${achievementTitle}!`,
      { achievementId, category: 'achievement' }
    )
  }
}
