
export function timeZone(date: Date | number , timeZone: string = "Europe/Moscow") {

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
      });

      return dateFormatter.format(date)
}