
enum AlertType {
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success'
}

export interface AlertProps {
    type: string;
    children: React.ReactNode;
}

export default function Alert({type, children}: AlertProps) {
    const enumType = AlertType[type as keyof typeof AlertType] ?? AlertType.INFO;
    // console.log(enumType);

    const alertClasses = {
        [AlertType.DANGER]: 'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800',
        [AlertType.WARNING]: 'text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:border-yellow-800',
        [AlertType.INFO]: 'text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:border-blue-800',
        [AlertType.SUCCESS]: 'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800',
    }

    const alertHeadline = {
        [AlertType.DANGER]: 'Error',
        [AlertType.WARNING]: 'Warning',
        [AlertType.INFO]: 'Info',
        [AlertType.SUCCESS]: 'Success',
    }

    return (
        <div
            className={`flex items-center p-4 mb-4 text-sm border rounded-lg dark:bg-gray-800 ${alertClasses[enumType]}`}
            role="alert"
        >
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <div className={'ml-5'}>
                <span className="font-medium">{alertHeadline[enumType]}: </span>
                {children}
            </div>
        </div>
    );
}